//* 클로저 예시로 상태를 쓰는 예시여서 일단 남겨둠.

export function setupCounter(element: HTMLButtonElement): void {
  let counter = 0;
  const setCounter = (count: number): void => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => {
    setCounter(counter + 1);
  });
  setCounter(0);
}
