import { Page, expect, test } from '@playwright/test'

export class VisualHelper {
  constructor(private page: Page) {}

  /**
   * Check full page snapshot
   * @param snapshotName Snapshot name
   * @param timeout Max timeout
   * @param maxDiffPixelsRatio Max difference pixel ratio
   */
  async checkPageSnapshot(snapshotName: string, timeout = 5_000, maxDiffPixelsRatio = 0.1) {
    const stepDescription = 'Compare snapshot: ' + snapshotName + ' with maxDiffPixelsRatio: ' + maxDiffPixelsRatio

    await test.step(stepDescription, async () => {
      await expect.soft(this.page, stepDescription).toHaveScreenshot(snapshotName, {
        maxDiffPixelRatio: maxDiffPixelsRatio,
        timeout: timeout,
        fullPage: false,
        animations: 'disabled'
      })
    })
  }
}
