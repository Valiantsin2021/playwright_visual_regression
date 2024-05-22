//@ts-check

import chalk from 'chalk'
import eyes from 'eyes'
import fs from 'fs'
import { type Page } from '@playwright/test'

/**
 * Logger utility for pretify request-response output
 */

export class Logger {
  /**
   * Logs a message to a specified log file or the default 'app.log'.
   * The log message includes a timestamp.
   *
   * @param {string} message - The message to be logged.
   * @param {string} [logfile='./fixtures/temp/fails.log'] - The name of the log file. Defaults to 'app.log'.
   * @throws {Error} Throws an error if there is an issue writing the log to the file.
   * @returns {void}
   * @static
   * @example
   * // Example Usage:
   * Logger.log('This is a log message');
   * // This will append a log entry to 'app.log' with the current timestamp and the specified message.
   *
   * @example
   * // Example Usage with custom log file name:
   * Logger.log('Custom log message', 'custom.log');
   * // This will append a log entry to 'custom.log' with the current timestamp and the specified message.
   */
  static logToFile(message: string, logfile: string = './fixtures/temp/fails.log'): void {
    const date = new Date().toISOString()
    try {
      fs.appendFileSync(logfile, `${date} - ${message}\n`)
      console.log(Logger.color.success(`Log written to ${logfile}`))
    } catch (err) {
      console.error(Logger.color.error(`Failed write log to file ${logfile} with error: ${err.message}`))
      throw err
    }
  }
  static inspect = eyes.inspector({
    // "@ts-expect-error
    maxLength: false,
    pretty: true,
    hideFunctions: false,
    stream: process.stdout
  })
  static color = {
    success: chalk.bold.hex('#0EF15D'),
    error: chalk.bold.hex('#E4271B'),
    warning: chalk.bold.hex('#FFA500'),
    info: chalk.hex('#A020F0'),
    outgoingRequest: chalk.hex('#0560fc'),
    incomingRequest: chalk.hex('#fcf805'),
    request: chalk.hex('#0560fc'),
    response: chalk.hex('#fcf805')
  }

  /**
   * Logs a request to the console based on the provided URL and data.
   * @property {Function} logRequest Logs a request to the console based on the provided URL and data.
   * @returns {Promise<void>}
   * @param {string} URL - Request URL.
   * @param {object} data - Request body.
   */

  static async logRequest(URL: string, data: object): Promise<void> {
    console.log(this.color.request(`\n<<<<<<<<<<<<<<<<< SENDING REQUEST <<<<<<<<<<<<<<<<<\nRequest URL: \n${this.color.info(URL)}\nRequest data: \n`))
    this.inspect(data)
    console.log(this.color.request('<<<<<<<<<<<<<<<<< END OF REQUEST <<<<<<<<<<<<<<<<<'))
  }

  /**
   * Logs a response to the console based on the provided status and data.
   * @property {Function} logResponse Logs a response to the console based on the provided status and data.
   * @returns {Promise<void>}
   * @param {string|number} status - Response status.
   * @param {object} data - Response body.
   */

  static async logResponse(status: string | number, data: object): Promise<void> {
    console.log(this.color.response(`\n<<<<<<<<<<<<<<<<< RECEIVING RESPONSE <<<<<<<<<<<<<<<<<\nResponse status: \n${this.color.info(status)}\nResponse data: \n`))
    this.inspect(data)
    console.log(this.color.response('<<<<<<<<<<<<<<<<< END OF RESPONSE <<<<<<<<<<<<<<<<<'))
  }

  /**
   * Logs requests and responses occurred on the UI testing page.
   * @property {Function} logBrowserConsole Logs requests and responses occurred on the UI testing page.
   * @returns {Promise<void>}
   * @param {Page} page - Page instance to listen for requests, responses, and console messages.
   */

  static async logBrowserConsole(page: Page): Promise<void> {
    // page.on('request', request => console.log(this.color.outgoingRequest('>>', request.method(), request.url())))
    // page.on('response', response => console.log(this.color.incomingRequest('<<', response.status(), response.url())))
    page.on('pageerror', async exception => {
      console.log(this.color.error(`Uncaught exception: "${exception}"`))
    })
    page.on('console', async messsage => {
      console.log(this.color.error(`BROWSER: ${messsage.type()} with message ${messsage.text()}`))
    })
  }
}
