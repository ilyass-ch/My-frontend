import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }

      padding-left: 24px;
      padding-right: 24px;
      paddingX: 1.3,
      paddingY: 1.2,
      font-weight: 600;
      font-size: 0.95rem;
      border-radius: 50px;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      transition: all 0.3s ease-in-out;
      text-transform: none;

      &:hover {
        background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
      }
    }
  `,
}));

const SubmitButton = ({ label = 'Submit', loading = false }) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        style={{
          width: '15%',
        }}
      >
        {label}
      </Button>
    </ConfigProvider>
  );
};

export default SubmitButton;
