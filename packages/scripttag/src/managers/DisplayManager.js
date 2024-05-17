import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.setting = {};
  }
  async initialize({notifications, setting}) {
    this.notifications = notifications;
    this.setting = setting;

    if (!this.showPopUp(this.setting[0])) {
      return;
    }

    // Your display logic here
    await this.delay(this.setting[0].firstDelay);
    const maxPopsDisplay = this.setting[0].maxPopsDisplay;
    const notificationDisplay = this.notifications.slice(0, maxPopsDisplay);
    for (const notification of notificationDisplay) {
      this.insertContainer();
      this.display({notification: notification});
      await this.delay(this.setting[0].displayDuration);
      this.fadeOut();
      await this.delay(this.setting[0].popsInterval);
    }
  }

  delay(timeInSeconds) {
    return new Promise(resolve => setTimeout(resolve, timeInSeconds * 1000));
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} settings={this.setting[0]} />, container);
  }

  showPopUp(setting) {
    const {excludedUrls, includedUrls, allowShow} = setting;

    const currentPage = window.location.href;

    const includedUrlsList = includedUrls.split('\n').map(url => url.trim());
    const excludedUrlsList = excludedUrls.split('\n').map(url => url.trim());

    if (
      (allowShow === 'all' && !excludedUrlsList.includes(currentPage)) ||
      (allowShow === 'specific' && includedUrlsList.includes(currentPage))
    ) {
      return true;
    }

    return false;
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.classList.add(this.setting[0].position);
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
