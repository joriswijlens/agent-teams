const { test, expect } = require('@playwright/test');

test.describe('Taken toevoegen via invoerveld (#1)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('invoerveld en knop zijn zichtbaar', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await expect(input).toBeVisible();
    await expect(button).toBeVisible();
  });

  test('nieuwe taak wordt toegevoegd met status open', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Mijn nieuwe taak');
    await button.click();

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Mijn nieuwe taak');
    await expect(lastItem).toContainText('open');
  });

  test('invoerveld wordt leeggemaakt na toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Test taak');
    await button.click();

    await expect(input).toHaveValue('');
  });

  test('knop is disabled bij leeg invoerveld', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await expect(button).toBeDisabled();
  });

  test('knop is disabled bij alleen spaties', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('   ');
    await expect(button).toBeDisabled();
  });

  test('taak toevoegen via Enter-toets', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');

    await input.fill('Enter taak');
    await input.press('Enter');

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Enter taak');
    await expect(lastItem).toContainText('open');
  });

});
