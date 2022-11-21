const { Console } = require("@woowacourse/mission-utils");
const Validation = require("./Validation");
const OutputView = require("./OutputView");
const { INPUT } = require("./constant/constantValue");

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(bridgeGame) {
    Console.readLine(`${INPUT.LENGTH}\n`, (length) => {
      const isBridgeLengthCorrect = Validation.checkBridgeLength(length);
      if (isBridgeLengthCorrect) return this.readBridgeSize(bridgeGame);

      bridgeGame.make(length);
      this.readMoving(bridgeGame);
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(bridgeGame) {
    Console.readLine(`\n${INPUT.MOVING}\n`, (moving) => {
      const isMovingValueCorrect = Validation.checkMovingValue(moving);
      if (isMovingValueCorrect) return this.readMoving(bridgeGame);
      const movingDirection = bridgeGame.move(moving);
      const outputBridge = OutputView.printMap(movingDirection);

      if (!movingDirection[2]) this.readGameCommand(bridgeGame, outputBridge);
      this.readMoving(bridgeGame);
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(bridgeGame, outputBridge) {
    Console.readLine(`\n${INPUT.SELECT}\n`, (select) => {
      const isSelectValueCorrect = Validation.checkingSelectValue(select);
      if (isSelectValueCorrect) return this.readGameCommand(bridgeGame);

      const selectResult = bridgeGame.retry(select, outputBridge);
      if (selectResult) this.readMoving(bridgeGame);
    });
  },
};

module.exports = InputView;
