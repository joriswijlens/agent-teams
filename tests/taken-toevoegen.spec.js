const { test, expect } = require('@playwright/test');

test.describe('Taken toevoegen via invoerveld (#1)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('invoerveld en toevoegen-knop zijn zichtbaar', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    await expect(input).toBeVisible();

    const button = page.getByRole('button', { name: 'Toevoegen' });
    await expect(button).toBeVisible();
  });

  test('nieuwe taak wordt toegevoegd aan de lijst', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Mijn nieuwe taak');
    await button.click();

    await expect(page.getByText('Mijn nieuwe taak')).toBeVisible();
  });

  test('nieuwe taak krijgt standaard de status open', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Taak met status');
    await button.click();

    const taakRij = page.locator('li').filter({ hasText: 'Taak met status' });
    await expect(taakRij).toBeVisible();
    await expect(taakRij.getByText('open')).toBeVisible();
  });

  test('invoerveld wordt leeggemaakt na toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder('Nieuwe taak...');
    const button = page.getByRole('button', { name: 'Toevoegen' });

    await input.fill('Tijdelijke taak');
    await button.click();

    await expect(input).toHaveValue('');
  });

  test('lege titel kan niet worden toegevoegd', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Toevoegen' });

    // Knop moet disabled zijn bij leeg invoerveld
    await expect(button).toBeDisabled();

    // Ook bij alleen spaties
    const input = page.getByPlaceholder('Nieuwe taak...');
    await input.fill('   ');
    await expect(button).toBeDisabled();
  });

});
