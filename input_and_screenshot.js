import { Selector, ClientFunction } from 'testcafe';

fixture('入力とスクリーンショット')
  .page('https://cdn.codegrid.net/2017-testcafe/demo/1.html')
  .skipJsErrors();

test('入力とスクリーンショットテスト', async t => {
  const hideElement = ClientFunction(() => {
    try {
      document.querySelector('#hide_element').style.display = 'none';
    }
    catch (error) {
      console.log(`hideElement:${error}`);
    }
  });
  await hideElement();

  const checkAllCheckboxes = ClientFunction(() => {
    document.querySelectorAll('[type="checkbox"]').forEach((ele) => {
      ele.checked = true;
    })
  });
  await checkAllCheckboxes();

  await t
  .typeText('[name="user-name"]', 'ユーザー名')
  .click(Selector('[name="user-job"]').withAttribute('value', '2'))
  .click(Selector('select'))
  .click(Selector('select').find('option').withText('関東周辺'))
  .typeText(Selector('[type="range"]'), '100')
  .typeText('#note', 'びこうらん')
  .takeScreenshot({
    path: 'pc.png',
    fullPage: true,
    thumbnails: false,
  })
  .resizeWindowToFitDevice('iphone3', {
    portraitOrientation: true
  })
  .takeScreenshot({
    path: 'sp.png',
    fullPage: true,
    thumbnails: false,
  })
});