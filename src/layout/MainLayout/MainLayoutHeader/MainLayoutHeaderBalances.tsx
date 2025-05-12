import React from 'react';
import { ArrowRight, ViewFormatter } from 'components';
import { storeInterface } from 'types/storeTypes';
import { useSelector } from 'react-redux';

export const MainLayoutHeaderBalances: React.FC = ({}) => {

  const { trade }: storeInterface = useSelector((store: storeInterface) => store);

  return (
   

          <div className='main-layout-topBar-balances'>

            <div 
            
              className='main-layout-topBar-balances-arrow' 
              
              dangerouslySetInnerHTML={{ __html : ArrowRight }} 
              
            />

            {[

              {

                title: "SHIPMENTS",
                value: trade.shipments.totalItems

              },

              {

                title: "CARRIERS",
                value:  trade.carriers.items.length

              },

              {

                title: "PRODUCTS",
                value: trade.products.items.length

              },

            ].map((item) => <ViewFormatter key={`header-item-${item.title}`} {...item} />


            )}

          </div>

        
  );
};
