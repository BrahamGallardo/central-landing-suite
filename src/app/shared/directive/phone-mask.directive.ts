import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[phoneMask]',
  standalone: true,
  host: {
    '[value]': 'phoneNumber',
    '(input)': 'formatPhoneNumber($event.target.value)',
  }
})
export class PhoneMaskDirective {
  @Input() phoneNumber: string;
  @Output() phoneNumberChange = new EventEmitter<string>();

  private editingAllowed: string[] = [
    'Backspace', // backspace
    'ArrowLeft', // left arrow
    'ArrowRight', // right arrow
    'Delete', // delete
  ];
  private allowed: string[] = [
    '0', // Code: 48
    '1', // Code: 49
    '2', // Code: 50
    '3', // Code: 51
    '4', // Code: 52
    '5', // Code: 53
    '6', // Code: 54
    '7', // Code: 55
    '8', // Code: 56
    '9', // Code: 57
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.ctrlKey &&
      (event.key === 'a' || event.key === 'v' || event.key === 'x' || event.key === 'c')
    ) {
      // allow pasting of content - the pasted content needs to get filtered in component this directive is used
      // allow select all
      // allow cut
      return;
    }

    if (this.editingAllowed.includes(event.key) && !event.shiftKey) {
      return;
    }

    if (this.phoneNumber.length > 11) {
      return event.preventDefault();
    }

    if (this.allowed.includes(event.key) && !event.shiftKey) {
      return;
    } else {
      return event.preventDefault();
    }
  }

  formatPhoneNumber(value: string) {
    if (!value) {
      return this.phoneNumberChange.next('');
    }
    const origLength = value.length;
    value = value.replace(/[^0-9]/g, '');
    value = value.slice(0, 10);
    let ret = '';
    for (let i = 0; i < value.length; ++i) {
      ret += value.charAt(i);
      if (
        (ret.length == 2 && origLength > 2) ||
        (ret.length == 7 && origLength > 7)
      ) {
        ret += '-';
      }
    }
    value = ret;
    this.phoneNumberChange.next(value);
  }

}
