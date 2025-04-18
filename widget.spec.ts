import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget ', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({ page }) => {
        widgetPage = new WidgetPage(page);

        // open uchi.ru main page
        await page.goto('/');

        // close cookies popup
        await page.click('._UCHI_COOKIE__button');
    });

    test('opens', async ({ page }) => {
        await widgetPage.openWidget();
        await expect(widgetPage.getWidgetBody()).toBeVisible();
    });

    test('has correct title', async ({ page }) => {
        await widgetPage.openWidget();

        const articles = await widgetPage.getPopularArticles();
        await articles[0].click();

        await widgetPage.clickWriteToUs();

        // Используем асинхронный expect с локатором для проверки текста
        await expect(widgetPage.wrapper().locator(WidgetPage.selector.HEADER_TEXT))
            .toHaveText('Связь с поддержкой');
    });
});
