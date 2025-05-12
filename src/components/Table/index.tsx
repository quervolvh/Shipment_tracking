import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { classnames } from 'utils';
import { SetClientAvailability } from 'hooks/useIsClient';

const TableData: React.FC<TableDataProp> = ({ item, count }) => {

    if (Array.isArray(item)) {
        return (
            <div className="td-div">
                {item.map((data, index) => typeof data === "string" && <p key={`table-${count}-${index}`}> {data || "----"} </p>)}
            </div>
        )
    }

    if (typeof item === "object") {

        if (item?.["status"]) {
            const statusItem = String(item?.status || "").replace(" ", "-");
            return (
                <div className={`status-full-${statusItem}`}>
                    {item?.value || `----`}
                </div>
            )
        }

    }

    if (typeof item === "string" || typeof item === "number") {
        return (
            <div className="td-div">
                <p> {item || "----"} </p>
            </div>
        )
    }

    return (
        <>
            {item || "----"}
        </>

    )
}

export const Table: React.FC<TableProps> = (
    { from, heading, OptionComponent,
        data, loaderLength,
        uniqueKey, loader, ...props
    }) => {

    const router = useRouter();

    const [clientMode, setClientMode] = useState(false);

    SetClientAvailability(e => setClientMode(e));

    return (
        <div>

            <div className="table-component">

                <table className={classnames(props.tableClass)}>
                    <thead>
                        <tr>

                            {(heading || []).map((head, index) => (
                                <React.Fragment key={`table-${uniqueKey}-head-${head}-${index}`}>
                                    {!props.customThRenderer ?
                                        <th > {head as any} </th>
                                        :
                                        <props.customThRenderer item={head} />
                                    }
                                </React.Fragment>

                            ))}

                            {OptionComponent && <th />}

                        </tr>
                    </thead>
                    <tbody>

                        {(!loader && clientMode) && (data || []).map((data_, index) => {

                            const propsValue = data_.find((option) => {

                                if (typeof option !== "string" && !Array.isArray(option)) {

                                    option = option as {};

                                    if (
                                        option?.render
                                        && [false, "link", "preClick"].includes(option.render || ""
                                        ))

                                        return option.render;

                                }

                                return false;

                            }) as tableRowProcessType;

                            const linkValue: string = propsValue?.to || "";

                            const preClick = propsValue?.preClick ? propsValue.preClick : () => null;

                            return (
                                <tr
                                    className={classnames("slideUpIn", `table-component-tr-${(heading || []).length}`)}

                                    key={`table-${uniqueKey}-body-row-${from}-${index}`}

                                    onClick={async () => {

                                        await preClick();

                                        linkValue && router.push(linkValue)

                                    }}
                                >

                                    {data_.map(
                                        (item: TableDateObjType | any, index_: number) => {

                                            if (typeof item === 'number' || typeof item === 'string' || Array.isArray(item)) {
                                                return (
                                                    <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`} >
                                                        <TableData item={item} count={`${index}-${index_}`} />
                                                    </td>
                                                );

                                            }

                                            if (typeof item === 'object' && item?.["status"] && item?.render === undefined) {
                                                return (
                                                    <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`} >
                                                        <TableData item={item} />
                                                    </td>
                                                );
                                            }

                                            if (typeof item === "function") {
                                                return (
                                                    <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`}
                                                        className={"td-button"}
                                                    >
                                                        {item()}
                                                    </td>
                                                );
                                            }

                                            return null;

                                        })
                                    }

                                    {
                                        OptionComponent &&

                                        <td>

                                            <OptionComponent {...propsValue} />

                                        </td>
                                    }

                                </tr>
                            );
                        })}

                        {(loader || !clientMode) &&

                            [...Array(loaderLength || 20)].map((val, index) => <tr key={`table-loader-${index}`}>

                                {
                                    (heading || []).map((item, index_) => <td key={`table-loader-${index}-col-${index_}`}>

                                        <div className='content-loader content-loader-table' />

                                    </td>

                                    )
                                }

                            </tr>
                            )

                        }


                    </tbody>
                </table>

            </div>
        </div>
    );
};


type tableRowProcessType = { render?: string | boolean | "link", to?: string, preClick?: () => void };
interface TableProps {
    data?: Array<string | null | undefined | tableRowProcessType | string[] | (() => React.ReactElement)>[]
    heading?: Array<{} | string>,
    OptionComponent?: React.FC<any>,
    uniqueKey?: string,
    from?: string,
    customTdRenderer?: React.ReactElement,
    customThRenderer?: React.FC<{ item: any }>,
    loader?: boolean,
    loaderLength?: number
    tableClass?: string
};

interface TableDataProp {
    item?: string | TableDateObjType | number | any | string[],
    count?: string
}

interface TableDateObjType { status?: string, value?: string, render?: boolean | string }
