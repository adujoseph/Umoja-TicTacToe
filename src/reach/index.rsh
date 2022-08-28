'reach 0.1';

const common = {
  ...hasRandom,
  test: Fun([], Null)

}
const Player = {
  seeOutcome: Fun([], Null),
}

export const main = Reach.App(() => {
  const Deployer = Participant('Deployer', {
    ...Player,
    wager: UInt,
  });
  const Attacher = Participant('Attacher', {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });

  init();

  Deployer.only(() => {
    const wagerAmount = declassify(interact.wager);
  });
  Deployer.publish(wagerAmount).pay(wagerAmount);
  commit();


  Attacher.only(() => {
    interact.acceptWager(wagerAmount);
  });
  Attacher.publish()
    .pay(wagerAmount)
    .timeout(240, () => closeTo(Deployer));
  commit();


  Attacher.interact.seeOutcome();
  Deployer.interact.seeOutcome();

  exit();
});