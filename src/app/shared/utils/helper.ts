import { FormGroup } from "@angular/forms";

export namespace Helpers {
    export function isInvalid(form: FormGroup, inputName: string, validatorName: string) {
        const control = form.get(inputName);
        return !!(control?.errors?.[validatorName] && control.touched);
    }
}
