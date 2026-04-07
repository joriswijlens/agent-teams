const { test, expect } = require('@playwright/test');

test.describe('Issue #1: Taken toevoegen via invoerveld', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toont een invoerveld en een "Toevoegen"-knop', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    await expect(input).toBeVisible();

    const button = page.getByRole('button', { name: /toevoegen/i });
    await expect(button).toBeVisible();
  });

  test('voegt een nieuwe taak toe aan de lijst', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    const button = page.getByRole('button', { name: /toevoegen/i });

    await input.fill('Mijn nieuwe taak');
    await button.click();

    await expect(page.getByText('Mijn nieuwe taak')).toBeVisible();
  });

  test('nieuwe taak krijgt standaard de status "open"', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    const button = page.getByRole('button', { name: /toevoegen/i });

    await input.fill('Status test taak');
    await button.click();

    const taskRow = page.locator('li').filter({ hasText: 'Status test taak' });
    await expect(taskRow).toBeVisible();
    await expect(taskRow.getByText('open')).toBeVisible();
  });

  test('invoerveld wordt leeggemaakt na toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    const button = page.getByRole('button', { name: /toevoegen/i });

    await input.fill('Tijdelijke taak');
    await button.click();

    await expect(input).toHaveValue('');
  });

  test('lege titel kan niet worden toegevoegd', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    const button = page.getByRole('button', { name: /toevoegen/i });

    // Veld leeg laten
    await expect(input).toHaveValue('');

    // Knop moet disabled zijn OF klikken mag geen taak toevoegen
    const isDisabled = await button.isDisabled();
    if (!isDisabled) {
      const countBefore = await page.locator('li').count();
      await button.click();
      const countAfter = await page.locator('li').count();
      expect(countAfter).toBe(countBefore);
    } else {
      await expect(button).toBeDisabled();
    }
  });

  test('meerdere taken achter elkaar toevoegen', async ({ page }) => {
    const input = page.getByPlaceholder(/taak|titel/i);
    const button = page.getByRole('button', { name: /toevoegen/i });

    await input.fill('Taak A');
    await button.click();
    await input.fill('Taak B');
    await button.click();

    await expect(page.getByText('Taak A')).toBeVisible();
    await expect(page.getByText('Taak B')).toBeVisible();
  });
});
