export default defineBackground(() => {
  const notifications = async (title: string, message: string) => {
    await browser.notifications.create('uuuUnForget', {
      type: 'basic',
      title,
      iconUrl: 'icon/128.png',
      message,
    });
  }

  browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.type === 'add_new_task') {
      const { value } = request

      void notifications('Good', value)
    }
  })
});
