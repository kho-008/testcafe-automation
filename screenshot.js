import { Selector, ClientFunction } from 'testcafe';
import { format } from 'date-fns';

const workTime = format(new Date(), 'yyyyMMdd_HHmmss');
const urlFormat = (url) => url.replace(/:|\/|#/g, '_');

const urls = [
  'https://cdn.codegrid.net/2017-testcafe/demo/1.html',
  'https://devexpress.github.io/testcafe/example/',
];

urls.forEach((url) => {
  fixture('スクリーンショット')
  .page(url)
  .skipJsErrors();

  test('スクリーンショットテスト', async t => {
    const hideElement = ClientFunction(() => {
      try {
        document.querySelector('#hide_element').style.display = 'none';
      }
      catch (error) {
        console.log(`hideElement:${error}`);
      }
    });
    await hideElement();

    await t
    .maximizeWindow()
    .takeScreenshot({
      path: `${urlFormat(url)}_${workTime}_pc.png`,
      fullPage: true,
      thumbnails: false,
    })
    .wait(3000)
    .resizeWindowToFitDevice('iphone3', {
      portraitOrientation: true
    })
    .wait(3000)
    .takeScreenshot({
      path: `${urlFormat(url)}_${workTime}_sp.png`,
      fullPage: true,
      thumbnails: false,
    })
  });
})