
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AxiosClient from "@/lib/client";
import { User } from "@/types/user";

async function getData() {
    const client = new AxiosClient("https://dummyjson.com");
    const res = await client.get("/products");
    const response = await client.get('/users');
    return { res, response };
}

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

async function Page() {
    const { res, response } = await getData()

    const products: Product[] = res?.products
    const users: User[] = response?.users

    if (!products) return <div>Loading...</div>

    return (
        <>
            <div className="p-20 container">
                <h2 className="mb-6 font-bold text-3xl">المنتجات</h2>
                <div className="grid grid-cols-3 gap-8 mb-20">
                    {products && products.map((item) => {
                        return (
                            <Card>
                                <img src={item.thumbnail} alt={item.title} />
                                <CardHeader>
                                    <CardTitle>
                                    {item.title}
                                        <h3 className="text-2xl font-medium">{item.title}</h3>
                                    </CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <p>{item.description}</p>
                            </Card>
                        )
                    })
                    }
                </div>

                <h2 className="mb-6 font-bold text-3xl">المستخدمين</h2>
                <div className="grid grid-cols-3 gap-8">

                    {
                        users && users.map((item) => {
                            return (
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center">

                                            <Avatar className="bg-gray-300 ml-6">
                                                <AvatarImage src={item.image} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-2xl font-medium">{item.firstName}</h3>
                                                <p>{item.email}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Page