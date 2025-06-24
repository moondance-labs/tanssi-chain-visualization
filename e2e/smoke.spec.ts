import { test, expect } from '@playwright/test';

test('website contains required texts', async ({ page }) => {
  await page.goto('https://moondance-labs.github.io/tanssi-chain-visualization/');

  for (const text of ['Tanssi chains visualization', 'Stagelight', 'Moonlight', 'Tanssi', 'Dancebox', 'Flashbox']) {
    await expect(page.locator(`text=${text}`).first()).toBeVisible();
  }
});
