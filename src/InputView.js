const { Console } = require("@woowacourse/mission-utils");
const Validation = require("./Validation");
const BridgeGame = require("./BridgeGame");
const { checkBridgeLength } = require("./Validation");

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    Console.readLine("다리의 길이를 입력해주세요.\n", (length) => {
      const isBridgeLengthCorrect = Validation.checkBridgeLength(length);
      if (isBridgeLengthCorrect) return this.readBridgeSize();

      const bridgeGame = new BridgeGame();
      bridgeGame.make(length);
      this.readMoving();
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    Console.readLine(
      "\n이동할 칸을 선택해주세요. (위: U, 아래: D)\n",
      (moving) => {
        const isMovingValueCorrect = Validation.checkMovingValue(moving);
        if (isMovingValueCorrect) return this.readMoving();
      }
    );
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},
};

module.exports = InputView;
