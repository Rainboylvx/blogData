[HTML Standard constraint Api](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api)

浏览器提供的表单验证API

```plaintext
element.willValidate
element.setCustomValidity(message)
element.validity.valueMissing
element.validity.typeMismatch
element.validity.patternMismatch
element.validity.tooLong
element.validity.tooShort
element.validity.rangeUnderflow
element.validity.rangeOverflow
element.validity.stepMismatch
element.validity.badInput
element.validity.customError
element.validity.valid
valid = element.checkValidity()
valid = element.reportValidity()
element.validationMessage
```

BootStrap 表单验证的逻辑

1. `:invalid`,`:valid`
2. Bootstrap 包含这两个伪类,使用`.was-validated`
3. Custom styles


?? 验证的流程,

- 监听相应的事件
  - `form.addEventListener : submit`
  - `form.addEventListener('invalid',function(){`

## 引用

- https://www.jianshu.com/p/cd119ff28659
