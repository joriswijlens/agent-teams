const { test, expect } = require('@playwright/test');

test.describe('Taken toevoegen via invoerveld (#1)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('invoerveld en toevoegen-knop zijn zichtbaar', async ({ page }) => {
    await expect(page.getByPlaceholder('Nieuwe taak...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toevoegen' })).toBeVisible();
  });

  test('nieuwe taak wordt toegevoegd met status open', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Mijn test taak');
    await button.click();

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Mijn test taak');
    await expect(lastItem).toContainText('open');
  });

  test('invoerveld wordt leeggemaakt na toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Tijdelijke taak');
    await button.click();

    await expect(input).toHaveValue('');
  });

  test('knop is disabled bij lege titel', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Toevoegen' });
    const input = page.getByPlaceholder('Nieuwe taak...');

    // Initieel leeg — knop moet disabled zijn
    await expect(button).toBeDisabled();

    // Na invullen — knop moet enabled zijn
    await input.fill('Iets');
    await expect(button).toBeEnabled();

    // Na leegmaken — knop weer disabled
    await input.fill('');
    await expect(button).toBeDisabled();
  });

  test('lege titel kan niet worden toegevoegd', async ({ page }) => {
    const initialCount = await page.locator('li').count();

    // Probeer spaties toe te voegen via Enter
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('   ');
    await input.press('Enter');

    // Aantal taken mag niet gewijzigd zijn
    await expect(page.locator('li')).toHaveCount(initialCount);
  });

  test('Enter-toets voegt taak toe', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');

    await input.fill('Enter taak');
    await input.press('Enter');

    const items = page.locator('li');
    const lastItem = items.last();
    await expect(lastItem).toContainText('Enter taak');
    await expect(lastItem).toContainText('open');

    // Invoerveld moet ook leeg zijn na Enter
    await expect(input).toHaveValue('');
  });

});
