/*
 * @Author: jiawei.mao
 * @Date: 2020-12-16 10:59:34
 * @Description: 
 */

interface FormProps {
  formRef: string;
  formModel: string;
  size: 'medium' | 'small' | 'mini';
  labelPosition: string,
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

interface Options {
  key: string | number;
  label: string;
  value: string | number;
}

namespace ElPropsNamespace {

  export type FormProps = {
    formRef: string;
    formModel: string;
    size: 'medium' | 'small' | 'mini';
    labelPosition: 'right' | 'left' | 'top';
    labelWidth: string;
    formRules: string;
    gutter: number;
    disabled: boolean;
    span: number;
    formBtns: boolean;
  }

  export type InputProps = {

  }

  export type ComponentProps = Array<{
    formLabel: string; // 配置项中文名称
    placeholder: string; // 输入提示
    componentName: string; // 组建名
    componentType: string; // 组建类型
    fieldName: string; // 配置项字段名
    options: Array<Options> // 可选项

  }>
}

export default ElPropsNamespace
