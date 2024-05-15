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

    // Your display logic here
    await new Promise(resolve => setTimeout(resolve, this.setting[0].firstDelay * 1000));
    let count = 0;
    for (const notification of this.notifications) {
      if (!this.showPopUp(this.setting[0])) {
        return;
      }
      count += 1;
      this.insertContainer();
      this.display({notification: notification});

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, this.setting[0].displayDuration * 1000)
      );

      this.fadeOut();

      await new Promise(resolve => setTimeout(resolve, this.setting[0].popsInterval * 1000));

      if (count >= this.setting[0].maxPopsDisplay) return;
    }
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
    // popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.classList.add(this.setting[0].position);
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
