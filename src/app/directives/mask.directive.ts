import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({
    selector: '[appMask]',
})

export class MaskDirective {
    @Input('appMask') appMask!: string;

    constructor(private elemet: ElementRef){

    }

    @HostListener('input', ['$event']) onInputChange(event: any){
        if (event.inpuType == 'deleteContentBackward') return;

        const initialValue = this.elemet.nativeElement.value;
        initialValue.replace(/[^0-9]*/g, '');
        if (initialValue !== this.elemet.nativeElement.value){
            event.stopPropagation();
        }
        this.elemet.nativeElement.value = this.format(this.appMask, initialValue);
    }

    format(mask: string, value: any){
        let text = '';
        let data = value;
        let c, m, i, x;

        for (i = 0, x = 1; x && i < mask.length; ++i) {
            c = data.charAt(i);
            m = mask.charAt(i);

            switch (mask.charAt(i)) {
                case '#':
                    if (/\d/.test(c)) {
                        text += c;
                    } else {
                        x = 0;
                    }
                    break;

                case 'A':
                    if (/[a-z]/i.test(c)) {
                        text += c;
                    } else {
                        x = 0;

                    }
                    break;

                case 'N':
                    if (/[a-z0-9]/i.test(c)) {
                        text += c;
                    } else {
                        x = 0;
                    }
                    break;

                case 'X':
                    text += c;
                    break;

                default:
                    text += m;
                    break;
            }
        }
        return text;
    }
}