import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });


  const addProduct = async (productId: number) => {
    try {
      const product = cart.find(cartProduct => cartProduct.id === productId)
      const newAmount = product ? product.amount + 1 : 1

      const stockResponse = await api.get<Stock>(`/stock/${productId}`)

      if (newAmount > stockResponse.data.amount) {
        toast.error('Quantidade solicitada fora de estoque')

        return
      }

      if (product) {
        const newCart = cart.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              amount: newAmount
            }
          }

          return product
        })

        setCart(newCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
      } else {
        const productsResponse = await api.get(`/products/${productId}`)
        const newProduct = {
          ...productsResponse.data,
          amount: newAmount
        }

        setCart([...cart, newProduct])
        localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart, newProduct]))
      }

    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const isExists = cart.some(product => product.id === productId)

      if (!isExists) {
        toast.error('Erro na remoção do produto')

        return
      }

      const newCart = cart.filter(product => product.id !== productId)

      setCart(newCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        return
      }

      const response = await api.get(`/stock/${productId}`)

      if (amount > response.data.amount) {
        toast.error('Quantidade solicitada fora de estoque')

        return
      }

      const product = cart.find(cartProduct => cartProduct.id === productId)

      if (product) {

        const newCart = cart.map(cartProduct => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              amount
            }
          }

          return cartProduct
        })

        setCart(newCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
