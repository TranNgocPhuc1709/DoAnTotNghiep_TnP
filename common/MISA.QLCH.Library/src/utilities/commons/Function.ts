export default class Function {
  /**
   * Test Await time out
   * @param ms 
   * @param msg 
   * @returns 
   * tnphuc - 19.09.2023 
   */
  public static getTimeOut(ms: number, msg: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(msg);
      }, ms);
    })
  }



}