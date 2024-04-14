/**
 * main.ts
 * - 入会フォームの回答を受け取り、webhookでDiscordに送信する
 *
 * @author ukwhatn / Yuki Watanabe (2110370205)
 * @version 1.0.0
 * @created 2024/04/15
 * @updated 2024/04/15
 *
 * @revisions
 * - 2024/04/15 created
 */

/**
 * GoogleAppsScript.Forms.ItemResponse[]を辞書型に変換する
 */
const responseToDict = (responses: GoogleAppsScript.Forms.ItemResponse[]): { [key: string]: string } => {
    const dict: { [key: string]: string } = {};
    responses.forEach((response) => {
        dict[response.getItem().getTitle()] = response.getResponse().toString();
    });
    return dict;
}

const ALERT_WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty("ALERT_WEBHOOK_URL");
const NAME_LIST_URL = PropertiesService.getScriptProperties().getProperty("NAME_LIST_URL");
const MAIL_SENDER_URL = PropertiesService.getScriptProperties().getProperty("MAIL_SENDER_URL");

const alertOnSubmit = (e: GoogleAppsScript.Events.FormsOnFormSubmit) => {
    // フォームの回答を取得
    // eがundefinedの場合（主にデバッグ用）は、最新の回答を取得
    const rawResponse = (e !== undefined) ? e.response : FormApp.getActiveForm().getResponses().pop();
    // 回答がない場合は何もしない
    if (rawResponse === undefined) {
        return;
    }

    // 回答を取得して辞書型に変換
    const responses = rawResponse.getItemResponses();
    const dict = responseToDict(responses);

    const answerDate = rawResponse.getTimestamp().toLocaleString();
    const nameString = `${dict['氏']} ${dict['名']} (${dict['フリガナ(氏)']} ${dict['フリガナ(名)']}`;
    const department = dict['学部・学科・コース'];
    const grade = dict['学年'];

    // Discordに表示する文章.
    const messageBody = `入会フォームが送信されました
----------
日時: ${answerDate}

氏名: ${nameString}
所属: ${department}
学年: ${grade}
----------
名簿: ${NAME_LIST_URL}
メール送信: ${MAIL_SENDER_URL}
`;

    UrlFetchApp.fetch(ALERT_WEBHOOK_URL, {
        'method': 'post',
        'headers': {'Content-type': 'application/json'},
        'payload': JSON.stringify({
            'content': messageBody,
            'tts': false,
        })
    });
}