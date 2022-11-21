const BridgeRandomNumberGenerator = require("./BridgeRandomNumberGenerator");
const BridgeMaker = require("./BridgeMaker");
const OutputView = require("./OutputView");
const { RESULT } = require("./constant/constantValue");

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #turn;
  #upperBridge;
  #lowerBridge;
  #try;

  constructor() {
    this.bridge;
    this.#turn = 0;
    this.#upperBridge = [];
    this.#lowerBridge = [];
    this.#try = 1;
  }

  make(length) {
    const bridge = BridgeMaker.makeBridge(
      length,
      BridgeRandomNumberGenerator.generate
    );
    this.bridge = bridge;
    console.log(bridge);
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(moving) {
    const canMove = this.canMove(moving);
    if (moving === "U") {
      canMove ? this.#upperBridge.push("O") : this.#upperBridge.push("X");
      this.#lowerBridge.push(" ");
    }
    if (moving === "D") {
      canMove ? this.#lowerBridge.push("O") : this.#lowerBridge.push("X");
      this.#upperBridge.push(" ");
    }
    return [this.#upperBridge, this.#lowerBridge, canMove];
  }

  canMove(moving) {
    if (this.bridge[this.#turn] === moving) {
      this.#turn += 1;
      return true;
    }
    return false;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry(select, outputBridge) {
    if (select === "R") {
      this.#try += 1;
      this.#turn = 0;
      this.#upperBridge = [];
      this.#lowerBridge = [];
      return true;
    }
    this.quit(outputBridge);
  }

  quit(outputBridge) {
    const resultMessage = RESULT.FAILURE;
    OutputView.printResult(this.#try, resultMessage, outputBridge);
  }
}

module.exports = BridgeGame;
