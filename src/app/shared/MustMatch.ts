import {FormGroup, ValidationErrors} from '@angular/forms';
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
}
/*export function passwordConfirmationMissmatch(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const confirmation = control.get('confirmation');
  if (!password || !confirmation || password.value === confirmation.value) {
    return null;
  }

  return { 'password-confirmation-mismatch': true };
}

export function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirmPassword').value
     ? null : {'mismatch': true};
}*/