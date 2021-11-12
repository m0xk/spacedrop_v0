import * as anchor from '@project-serum/anchor'
import { Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { Account } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'
import assert from 'assert'
import Provider from './provider'
import { ACCOUNTS } from './accounts'
import { createToken,predefinedAccount,assertThrowsAsync } from './utils'
export const SEED = Buffer.from('NB:Airdrop')

describe('airdrop', () => {
  const provider = Provider.local()
  console.log(provider)
  anchor.setProvider(provider);
  //Authority_Token_Account
  const programTokenAccount_sketch = new PublicKey("9o2gNamR2TwBthQAjpvSzjzWyRNEdtRSGpkcpsxHkqgG")
  //Token_Mint
  const programTokenAccount_token= new PublicKey("5vqgedqW36UzzyoYyGX62GPHxtWQqV9mTevTWns4bwhG")
  //Authority_Account
  const authority= new PublicKey("5wafoLoUN2PsGH5V467gm1wREY6vzZ9HvX8Greg5ZoNA")



  //const provider = anchor.Provider.local()
  const program = anchor.workspace.Airdrop as anchor.Program
  const connection = program.provider.connection
  // @ts-expect-error
  const wallet: Account = provider.wallet.payer as Account
  let blue: Token
  let nonce: number
  //let authority: PublicKey
  let programTokenAccount: PublicKey
  let token: Token
  const amountPerUser = new anchor.BN(1000000)
  const totalAmount = new u64(100000000000)

  before(async () => {
    //const [_authority, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      //[SEED],
      ///program.programId
    //)
  //  nonce = _nonce
    //authority = _authority
    //console.log(authority.toBase58())
    // @ts-expect-error
    //await program.state.rpc.new(nonce, amountPerUser, {
      //accounts: {
        //authority: authority
      //}
    //})
    token = await createToken({
      connection,
      payer: wallet,
      mintAuthority: wallet.publicKey,
      decimals: 1
    })
    let blue=token
    blue.publicKey=programTokenAccount_token
    //programTokenAccount = await blue.createAccount(authority)
    //token.mintTo(programTokenAccount, wallet, [], totalAmount)
  })

  describe('#claim', () => {
    it('Claim with eligible account', async () => {
      let blue=token
      blue.publicKey=programTokenAccount_token
      console.log('claim with test')
      const randomAccount = new Account()
      console.log(randomAccount.publicKey.toBase58())
      const index = ACCOUNTS.findIndex((a) => a === predefinedAccount.publicKey.toString())
      console.log(index)
    //const userAccount = await blue.createAssociatedTokenAccount(predefinedAccount3.publicKey)
      const userAccount = await blue.getOrCreateAssociatedAccountInfo(predefinedAccount.publicKey)

      const userAccountInfoBefore = await token.getAccountInfo(userAccount.address)
      assert.ok(userAccountInfoBefore.amount.eq(new anchor.BN(0)))

      // @ts-expect-error
      await program.state.rpc.claim(index, {
        accounts: {
          authority: authority,
          tokenProgram: TOKEN_PROGRAM_ID,
          programAccount: programTokenAccount_sketch,
          signer: predefinedAccount.publicKey,
          to: userAccount.address
        },
          signers: [predefinedAccount]

      })

      const userAccountInfoAfter = await token.getAccountInfo(userAccount.address)
      assert.ok(userAccountInfoAfter.amount.eq(amountPerUser))
      // Try to claim again
      assertThrowsAsync(
        // @ts-expect-error
        program.state.rpc.claim(index, {
          accounts: {
            authority: authority,
            tokenProgram: TOKEN_PROGRAM_ID,
            programAccount: programTokenAccount_sketch,
            signer: predefinedAccount3.publicKey,
            to: userAccount.address
          },
          signers: [randomAccount, randomAccount]
        })
      )
    })
    it('Claim with non eligible account', async () => {
      const randomAccount = new Account()


      const userAccount = await token.createAssociatedTokenAccount(randomAccount.publicKey)

      const userAccountInfoBefore = await token.getAccountInfo(userAccount)
      assert.ok(userAccountInfoBefore.amount.eq(new anchor.BN(0)))

      // Try to claim
      assertThrowsAsync(
        // @ts-expect-error
        program.state.rpc.claim(12, {
          accounts: {
            authority: authority,
            tokenProgram: TOKEN_PROGRAM_ID,
            programAccount: programTokenAccount_sketch,
            signer: randomAccount.publicKey,
            to: userAccount
          },
          signers: [randomAccount, randomAccount]
        })
      )








    })
  })
})
