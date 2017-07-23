import * as chalk from "chalk";

export function outputError(error: Error): void {
  const warning = chalk.red("ERROR!");
  const title = "Metro Disruptions";

  console.error(`${warning} ${title}\n`);
  console.error(errorRow("Type", error.name));
  console.error(errorRow("Message", error.message));
  console.error(errorStack(error.stack));
}

function errorRow(title: string, content: string): string {
  const indent = 10;
  const padding = " ".repeat(indent - (title.length + 1));
  const label = chalk.cyan(`${title}:`);

  return content
    .split("\n")
    .map((line, index) => index ? `${" ".repeat(indent)}${line}` : `${label}${padding}${line}`)
    .join("\n");
}

function errorStack(stack: string): string {
  const stackLines = stack
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .join("\n");

  return errorRow("Stack", stackLines);
}
