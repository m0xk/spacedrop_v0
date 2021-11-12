use anchor_lang::prelude::*;
mod data;
use anchor_spl::token::{self, TokenAccount, Transfer};

use data::ACCOUNTS;
const SEED: &str = "NB:Airdrop";

#[program]
pub mod airdrop {
    use super::*;
    #[state(zero_copy)]
    pub struct InternalState {
        pub authority: Pubkey,
        pub amount: u64,
        pub nonce: u8,
        pub claims: [bool; 2], // Size should be same as data accounts.
    }
    impl InternalState {
        // can use nonce name right ?
        // fixed with _nonce
        pub fn new(&mut self, ctx: Context<Init>, _nonce: u8, amount: u64) -> ProgramResult {
            self.authority = *ctx.accounts.authority.key;
            self.amount = amount;
            self.nonce = _nonce;
            Ok(())
        }

        pub fn claim(&mut self, ctx: Context<Claim>, index: u16) -> Result<()> {
            if ACCOUNTS[index as usize] != ctx.accounts.signer.key.to_string() {
                return Err(ErrorCode::Unauthorized.into());
            }
            if self.claims[index as usize] == true {
                return Err(ErrorCode::AlreadyClaimed.into());
            }
            self.claims[index as usize] = true;

            let seeds = &[SEED.as_bytes(), &[self.nonce as u8]];
            let signer = &[&seeds[..]];
            let cpi_ctx = CpiContext::from(&*ctx.accounts).with_signer(signer);
            token::transfer(cpi_ctx, self.amount);
            Ok(())
        }
    }
}
#[derive(Accounts)]
pub struct Claim<'info> {
    pub authority: AccountInfo<'info>,
    #[account("token_program.key == &token::ID")]
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    pub program_account: CpiAccount<'info, TokenAccount>,
    #[account(mut)]
    pub to: CpiAccount<'info, TokenAccount>,
    #[account(signer)]
    pub signer: AccountInfo<'info>,
}

impl<'a, 'b, 'c, 'info> From<&Claim<'info>> for CpiContext<'a, 'b, 'c, 'info, Transfer<'info>> {
    fn from(accounts: &Claim<'info>) -> CpiContext<'a, 'b, 'c, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: accounts.program_account.to_account_info(),
            to: accounts.to.to_account_info(),
            authority: accounts.authority.to_account_info(),
        };
        let cpi_program = accounts.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}
#[derive(Accounts)]
pub struct Init<'info> {
    authority: AccountInfo<'info>,
}
#[error]
pub enum ErrorCode {
    #[msg("You are not eligible to recive Airdrop")]
    Unauthorized,
    #[msg("Already claimed Airdrop")]
    AlreadyClaimed,
}
