# eosbet-cli
> :game_die: Play [EOSBet](https://dice.eosbet.io/?ref=yeloyeloyelo) in Terminal

## Installation
```bash
npm i -g @yelo/eosbet-cli
```

## Usage
1. Setup your eos account:

  ```bash
  $ eosbet config

  ? Select the config section: account
  # your account name (12 chars) here
  ? name: xxxxxxxxxxxx
  ? authority: active
  # your private key will only be stored locally on your computer
  ? private_key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ```

2. Play Dice!

  ```bash
  $ eosbet dice

  ✔  success   Database ready
  ✔  success   Monitor connected
  ▶  start     Ready for a new game:
  ? Your lucky number 96
  ? Bet amount 0.1
  ? You sure? Let's make a bet! Yes
  …  awaiting  Connecting eosio.token
  …  awaiting  Sending transfer
  …  awaiting  Transaction finished.
  …  awaiting  Waiting for result from eosbet
  ✔  success   Bet result: 41. You WIN
  ```

3. Quit?

  [Press `Ctrl+C` to Quit](https://superuser.com/questions/103909/how-to-stop-a-process-in-terminal/103910#103910)


## Commands
### Config
```bash
eosbet config
```

### Play dice
```bash
eosbet dice
```

### Help
```bash
eosbet -h
```

## Donate
Donate via EOS: `yeloyeloyelo`

## License
MIT &copy; [yelo](https://github.com/imyelo)
