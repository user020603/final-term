import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;

    // console.log(this.notifications);
    console.log(this.settings);

    // Your display logic here
    await new Promise(resolve => setTimeout(resolve, this.settings[0].firstDelay * 1000));
    let count = 0;
    for (const notification of this.notifications) {
      count += 1;
      if (count >= this.settings[0].maxPopsDisplay) break;
      this.insertContainer();
      this.display({notification: notification});

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, this.settings[0].displayDuration * 1000)
      );

      this.fadeOut({notification: notifications});

      await new Promise(resolve => setTimeout(resolve, this.settings[0].popsInterval * 1000));
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    // popupEl.classList.add('Avada-SalePop__OuterWrapper');
    popupEl.classList.add(this.settings[0].position);
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
