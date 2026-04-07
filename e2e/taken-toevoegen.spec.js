const { test, expect } = require('@playwright/test');

test.describe('Taken toevoegen (Issue #1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('invoerveld en toevoegen-knop zijn zichtbaar', async ({ page }) => {
    await expect(page.getByPlaceholder('Nieuwe taak...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toevoegen' })).toBeVisible();
  });

  test('nieuwe taak wordt toegevoegd met status open', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('Mijn nieuwe taak');
    await page.getByRole('button', { name: 'Toevoegen' }).click();

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Mijn nieuwe taak');
    await expect(lastItem).toContainText('open');
  });

  test('invoerveld wordt leeggemaakt na toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('Test taak');
    await page.getByRole('button', { name: 'Toevoegen' }).click();

    await expect(input).toHaveValue('');
  });

  test('knop is disabled bij lege titel', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Toevoegen' });
    await expect(button).toBeDisabled();

    // Ook disabled bij alleen spaties
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('   ');
    await expect(button).toBeDisabled();
  });

  test('taak toevoegen met Enter-toets', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('Enter taak');
    await input.press('Enter');

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Enter taak');
    await expect(lastItem).toContainText('open');
    await expect(input).toHaveValue('');
  });
});
