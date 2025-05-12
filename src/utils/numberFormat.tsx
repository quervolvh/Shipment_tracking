export const numberFormat = ( number_? : number , currency? : string | null ) : string => {

    try {

        number_ = Number(number_);

        if (currency === null && (number_ || number_ === 0)) {

            return Intl.NumberFormat(
                "en",
            ).format(number_);

        }

        currency = currency || 'CAD';
        const locale = 'en-CA';

        return Intl.NumberFormat(locale.trim(), { style: 'currency', currency : currency  }).format(number_);

    } catch {

        return Intl.NumberFormat('en-CA', { style: 'currency', currency: currency || 'CAD' }).format(0.00);

    }

}
