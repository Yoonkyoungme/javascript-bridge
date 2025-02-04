const { Console } = require("@woowacourse/mission-utils");
const { OUTPUT, RESULT } = require("./constant/constantValue");

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printStart() {
    Console.print(`${OUTPUT.START}\n`);
  },

  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(movingDirection) {
    const upperBridge = movingDirection[0];
    const lowerBrigde = movingDirection[1];
    const printUpperBridge = "[ " + upperBridge.join(" | ") + " ]";
    const printLowerBridge = "[ " + lowerBrigde.join(" | ") + " ]";

    Console.print(printUpperBridge);
    Console.print(printLowerBridge);

    return { printUpperBridge, printLowerBridge };
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(trying, resultMessage, outputBridge) {
    Console.print(`${OUTPUT.RESULT}`);
    Console.print(
      `${outputBridge.printUpperBridge}\n${outputBridge.printLowerBridge}\n`
    );
    Console.print(`${RESULT.RESULT}: ${resultMessage}`);
    Console.print(`${RESULT.ATTEMPTS}: ${trying}`);
    Console.close();
  },
};

module.exports = OutputView;
