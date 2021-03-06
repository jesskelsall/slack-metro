import * as cheerio from "cheerio";
import * as moment from "moment-timezone";

export interface Disruption {
  lines: string[];
  updated: Date;
}

export function formatDisruptions(disruptions: Cheerio): Disruption[] {
  const formattedDisruptions: Disruption[] = [];

  disruptions.each((index, disruption) => {
    formattedDisruptions.push(formatDisruption(disruption));
  });

  return formattedDisruptions;
}

export function formatDisruption(disruption: CheerioElement): Disruption {
  const $: CheerioStatic = cheerio.load(disruption);
  const lines: string[] = [];

  $(disruption).children("p").each((index: number, paragraph: CheerioElement) => {
    const line: string = collapseWhitespace($(paragraph).text()).trim();
    lines.push(line);
  });

  const updatedDiv = $(disruption).children("div");
  const updated = formatUpdatedDate(updatedDiv);

  return { lines, updated };
}

function formatUpdatedDate(element: Cheerio): Date {
  const momentFormat: string = "HH:mm, dddd, D MMMM YYYY";
  const momentTimezone: string = "Europe/London";
  const updatedText: string = collapseWhitespace(element.text()).replace("Updated at", "");

  return moment(updatedText, momentFormat).tz(momentTimezone).toDate();
}

function collapseWhitespace(text: string): string {
  const whiteSpaces: RegExp = /\s+/g;
  const lineBreaks: RegExp = /<br[ /]*>/i;

  return text.replace(lineBreaks, "").replace(whiteSpaces, " ");
}
