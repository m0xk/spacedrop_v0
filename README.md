# spacedrop_v0


This repo is already setup for use (The user will be requested to create associated token account (in this example this is paid for by us but the user will pay for this to eliminate this security risk)

anchor build

anchor deploy --provider.cluster devnet

yarn install

ts-mocha airdrop_0.spec.ts --timeout 10000

Once this is run you will need to get the authority account address, authority token account address and token mint address

and insert this into  airdrop_3.spec.ts

ts-mocha airdrop_3.spec.ts --timeout 10000


The accounts.ts file can be modified to include your sol address

the data.rs file can modified to include your sol address (This is the set of addresses stored on chain that eligible to claim) 

To deploy the program to devnet you will need to update the Anchor.toml file 

In tests folder spec_0 and spec_3 can be run

spec_0 creates the program authority account

spec_3 tests address eligibility and claim

This app uses the phantom wallet and is using solana devnet
