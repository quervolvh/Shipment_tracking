import React from 'react';
import { classnames } from 'utils/index';

export const PlainInput: React.FC<Props> = (
    {
        type,
        label,
        onClick,
        onChange,
        value,
        placeHolder,
        className = '',
        alignIconToLeft,
        ...props
    }
) => {

    const change = (val: any) => {
        if (onChange) {
            onChange(val);
        }
    };

    return (
        <div
            className={
                classnames(
                    'form-field',
                    className,
                    type === 'password' && 'with-password',
                    alignIconToLeft && "form-field-icon-left",
                )}
        >

            {label &&

                <div className={
                    classnames(
                        "form-field-title-block",
                    )
                }>

                    <p className="form-field-title">

                        {label}

                        {props.required === false ?
                            <i className="form-field-optional"> (Optional) </i> :
                            <></>
                        }

                    </p>

                </div>

            }

            {props.svgIcon && <div className="form-field-icon" dangerouslySetInnerHTML={{ __html: props.svgIcon }} />}

            {props.icon && <img src={props.icon} alt={"input-icon"} />}

            <input
                type={type}
                className="form-input"
                onChange={(e) => !props.disabled && change(e.target.value)}
                placeholder={placeHolder}
                readOnly={props.readonly || false}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onClick={() => typeof onClick === "function" && onClick()}
                {... (type !== "password" && { value })}
            />

        </div>
    );
};

interface Props {
    type: string,
    label?: string,
    onlyNumber?: true,
    errorClass?: string,
    onChange?(arg: any): () => void,
    onClick?: () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    icon?: string,
    alignIconToLeft?: boolean,
    svgIcon?: string,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    required?: boolean,
}
