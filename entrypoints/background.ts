export default defineBackground(() => {
  browser.browserAction.setBadgeText({text: 'new'});
  browser.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});

  browser.runtime.onInstalled.addListener(function () {
    browser.declarativeContent.onPageChanged.removeRules(undefined, function () {
      browser.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            // 只有打开百度才显示pageAction
            new browser.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'baidu.com' } })
          ],
          actions: [new browser.declarativeContent.ShowPageAction()]
        }
      ]);
    });
  });

});
