// const darkTheme = {
//   mainBackground: "hsl(222, 26%, 31%)",
//   keypadAndToggleBackground: "hsl(223, 31%, 20%)",
//   screenBackground: "hsl(224, 36%, 15%)",
//   keyBackground: "hsl(30, 25%, 89%)",
//   keyActiveBackground: "hsl(0, 0%, 100%)",
//   keyShadow: "hsl(28, 16%, 65%)",
//   delAndResetBackground: "hsl(225, 21%, 49%)",
//   delAndResetActiveBackground: "hsl(224, 51%, 76%)",
//   delAndResetShadow: "hsl(224, 28%, 35%)",
//   equalAndToggleBackground: "hsl(6, 63%, 50%)",
//   equalAndToggleActiveBackground: "hsl(6, 93%, 67%)",
//   equalShadow: "hsl(6, 70%, 34%)",
//   textDark: "hsl(221, 14%, 31%)",
//   equalTextColor: "hsl(0, 0%, 100%)",
//   textLight: "hsl(0, 0%, 100%)",
// };

// const violetTheme = {
//   mainBackground: "hsl(268, 75%, 9%)",
//   keypadAndToggleBackground: "hsl(268, 71%, 12%)",
//   screenBackground: "hsl(268, 71%, 12%)",
//   keyBackground: "hsl(268, 47%, 21%)",
//   keyActiveBackground: "hsl(267, 54%, 44%)",
//   keyShadow: "hsl(290, 70%, 36%)",
//   delAndResetBackground: "hsl(281, 89%, 26%)",
//   delAndResetActiveBackground: "hsl(280, 56%, 44%)",
//   delAndResetShadow: "hsl(285, 91%, 52%)",
//   equalAndToggleBackground: "hsl(176, 100%, 44%)",
//   equalAndToggleActiveBackground: "hsl(177, 100%, 79%)",
//   equalShadow: "hsl(177, 92%, 70%)",
//   textDark: "hsl(52, 100%, 62%)",
//   equalTextColor: "hsl(198, 20%, 13%)",
//   textLight: "hsl(0, 0%, 100%)",
// };

// function switchTheme(theme) {
//   document.documentElement.style.setProperty(
//     "--main-background",
//     theme.mainBackground
//   );
//   document.documentElement.style.setProperty(
//     "--keypad-and-toggle-background",
//     theme.keypadAndToggleBackground
//   );
//   document.documentElement.style.setProperty(
//     "--screen-background",
//     theme.screenBackground
//   );
//   document.documentElement.style.setProperty(
//     "--key-background",
//     theme.keyBackground
//   );
//   document.documentElement.style.setProperty(
//     "--key-active-background",
//     theme.keyActiveBackground
//   );
//   document.documentElement.style.setProperty("--key-shadow", theme.keyShadow);
//   document.documentElement.style.setProperty(
//     "--del-and-reset-background",
//     theme.delAndResetBackground
//   );
//   document.documentElement.style.setProperty(
//     "--del-and-reset-active-background",
//     theme.delAndResetActiveBackground
//   );
//   document.documentElement.style.setProperty(
//     "--del-and-reset-shadow",
//     theme.delAndResetShadow
//   );
//   document.documentElement.style.setProperty(
//     "--equal-and-toggle-background",
//     theme.equalAndToggleBackground
//   );
//   document.documentElement.style.setProperty(
//     "--equal-and-toggle-active-background",
//     theme.equalAndToggleActiveBackground
//   );
//   document.documentElement.style.setProperty(
//     "--equal-shadow",
//     theme.equalShadow
//   );
//   document.documentElement.style.setProperty("--text-dark", theme.textDark);
//   document.documentElement.style.setProperty(
//     "--equal-text-color",
//     theme.equalTextColor
//   );
//   document.documentElement.style.setProperty("--text-light", theme.textLight);
// }

// // toggle button
// const toggleButton = document.getElementById("toggle-button");
// const position = document.querySelectorAll(".position");
// let currentPosition = 0;

// function updatePosition() {
//   position.forEach((pos, index) => {
//     pos.classList.toggle("active", index === currentPosition);
//   });
// }

// updatePosition();
// toggleButton.addEventListener("click", () => {
//   currentPosition = (currentPosition + 1) % 3;
//   updatePosition();
// });

document.querySelectorAll(".theme-option").forEach((option) => {
  option.addEventListener("click", () => {
    // Remove active class from all options
    document.querySelectorAll(".theme-option").forEach((opt) => {
      opt.classList.remove("active");
    });

    // Add active class to clicked option
    option.classList.add("active");

    // Update theme
    const theme = option.dataset.theme;
    document.body.className = `theme${theme}`;
  });
});

// Calculator Functionalities

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector(".screen");
  const btns = document.querySelectorAll(".btn");
  const resetBtn = document.querySelector(".btn-reset");
  const delBtn = document.querySelector(".btn-del");

  let currentInput = "";
  let previousInput = "";
  let operator = null;

  function updateScreen(value) {
    screen.textContent = value || "0";
  }

  function handelClick(event) {
    const value = event.target.textContent;

    if (!isNaN(value) || value === ".") {
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      updateScreen(currentInput);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "×" ||
      value === "/"
    ) {
      if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
      }
      operator = value === "×" ? "*" : value;
    } else if (value === "=") {
      if (previousInput && operator && currentInput) {
        const result = eval(`${previousInput}  ${operator}  ${currentInput}`);
        previousInput = "";
        currentInput = result.toString();
        operator = null;
        updateScreen(currentInput);
      }
    }
  }
  resetBtn.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateScreen("");
  });

  delBtn.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput);
  });
  btns.forEach((btn) => {
    btn.addEventListener("click", handelClick);
  });
});
