use {
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::msg,
    solana_program::program_error::ProgramError,
    solana_program::program_pack::{Pack, Sealed},
    solana_program::pubkey::Pubkey,
};

pub const TARGET_AUTHORITY: &str = "target-authority";
pub const BASE_STORAGE_AUTHORITY: &str = "base-storage-authority";

#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
pub enum Key {
    TokenBondingV0,
    LogCurveV0,
    BaseRelativeLogCurveV0,
}

#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
pub struct TokenBondingV0 {
    pub key: Key,
    pub base_mint: Pubkey,
    pub target_mint: Pubkey,
    pub authority: Pubkey,
    pub base_storage: Pubkey,
    pub founder_rewards: Pubkey,
    /// Percentage of purchases that go to the founder
    /// Percentage Value is (founder_reward_percentage / 10,000) * 100
    pub founder_reward_percentage: u16,
    /// The bonding curve to use 
    pub curve: Pubkey,
    pub initialized: bool,
}
impl Sealed for TokenBondingV0 {}

impl Pack for TokenBondingV0 {
    const LEN: usize = 1 + 32 * 6 + 2 + 1;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let mut slice = dst;
        self.serialize(&mut slice).unwrap()
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut p = src;
        TokenBondingV0::deserialize(&mut p).map_err(|_| {
            msg!("Failed to deserialize name record");
            ProgramError::InvalidAccountData
        })
    }
}

pub trait Curve {
    fn initialized(&self) -> bool;
    fn price(&self, base_supply: u64, target_supply: u64, amount: u64) -> u64;
}

/// If normal log curve, c * log(1 + (numerator * x) / denominator)
/// If base relative, c * log(1 + (numerator * x) / (denominator * base_supply))
#[repr(C)]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug, Clone)]
pub struct LogCurveV0 {
    pub key: Key,
    pub numerator: u64,
    pub denominator: u64,
    pub c: u64,
    pub initialized: bool
}
impl Sealed for LogCurveV0 {}

/// Integral of c * log(1 + g * x) dx from a to b Here g = numerator / denominator
/// https://www.wolframalpha.com/input/?i=c+*+log%281+%2B+g+*+x%29+dx
fn log_curve(c: f64, g: f64, a: f64, b: f64) -> f64 {
    let general = |x: f64| c * ((((1_f64 / g) + x) * ((g * x) + 1_f64).ln()) - x);
    general(b) - general(a)
}

impl Curve for LogCurveV0 {
    fn initialized(&self) -> bool {
        self.initialized
    }

    fn price(&self, base_supply: u64, target_supply: u64, amount: u64) -> u64 {
        let g: f64 = if self.key == Key::BaseRelativeLogCurveV0 {
            (self.numerator as f64) / (self.denominator as f64 * base_supply as f64)
        } else {
            (self.numerator as f64) / (self.denominator as f64)
        };
        let fvalue = log_curve(self.c as f64, g as f64, target_supply as f64, target_supply as f64 + amount as f64);
        fvalue.round() as u64
    }
}

impl<T> From<T> for Box<dyn Curve>
where
    T: Curve + 'static,
{
    fn from(curve: T) -> Self {
        Box::new(curve)
    }
}

impl Pack for LogCurveV0 {
    const LEN: usize = 1 + 8 * 3 + 1;

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let mut slice = dst;
        self.serialize(&mut slice).unwrap()
    }

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut p = src;
        LogCurveV0::deserialize(&mut p).map_err(|_| {
            msg!("Failed to deserialize log curve record");
            ProgramError::InvalidAccountData
        })
    }
}