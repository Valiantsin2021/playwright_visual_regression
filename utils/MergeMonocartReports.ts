/**
 * Module for merging Monocart reports.
 * @module MonocartReporter
 * @requires merge
 * @requires readdirSync
 * @requires readFileSync
 * @requires resolve
 * @requires join
 * @requires dirname
 * @requires fileURLToPath
 */

import { merge } from 'monocart-reporter'
import { readdirSync, readFileSync } from 'fs'
import { resolve, join } from 'path'

/**
 * Get a list of directories in a given directory path.
 * @param {string} directoryPath - The path of the directory to search for directories.
 * @returns {string[]} - An array of directory names.
 */
const getDirectories = (directoryPath: string): string[] =>
  readdirSync(directoryPath, { withFileTypes: true }).reduce((acc, dir) => {
    dir.isDirectory() && acc.push(dir.name)
    return acc
  }, [])

/**
 * Get a list of report data from directories containing 'index.json' files.
 * @param {string} directoryPath - The path of the directory containing reports.
 * @returns {Object[]} - An array of report data objects.
 */
const getReportDataList = (directoryPath: string): object[] => {
  const directories = getDirectories(directoryPath)
  const reportsPath = []
  for (const directory of directories) {
    const files = readdirSync(join(directoryPath, directory))
    for (const file of files) {
      if (file === 'index.json') {
        // @ts-ignore
        reportsPath.push(JSON.parse(readFileSync(join(directoryPath, directory, file))))
      }
    }
  }
  return reportsPath
}

/**
 * Merge report data from multiple directories and generate a single report.
 * @async
 * @function mergeReports
 * @returns {Promise<void>} - A promise that resolves after merging reports.
 */
const mergeReports = async (): Promise<void> => {
  const reportDataList = getReportDataList(resolve(__dirname, '../report'))
  await merge(reportDataList, {
    name: 'Automation Execution Report',
    outputFile: `report/megred_monocart_report.html`,
    //@ts-ignore
    attachmentPath: (currentPath, extras) => {},
    onEnd: async (reportData, capability) => {}
  })
}

// Execute mergeReports function immediately when this module is imported.
mergeReports()

export { mergeReports }
