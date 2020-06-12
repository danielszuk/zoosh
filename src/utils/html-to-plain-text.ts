export default function htmlToPlainText(htmlString: string): string {
  return htmlString.replace(/<br(\/)?>/g, ' ').replace(/<([^>])*>/g, '');
}
