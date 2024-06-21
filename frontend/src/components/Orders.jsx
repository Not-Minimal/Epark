import { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40"></div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <div className="flex-1">
              <h1 className="font-semibold text-lg">Recent Orders</h1>
            </div>
            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="border shadow-sm rounded-lg p-2">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                        Order
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 min-w-[150px]">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Channel
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Date
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                        Total
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Status
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3210
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Olivia Martin
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Online Store
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        February 20, 2022
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $42.25
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Shipped
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3209
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Ava Johnson
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Shop
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        January 5, 2022
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $74.99
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Paid
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3204
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Michael Johnson
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Shop
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        August 3, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $64.75
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Unfulfilled
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3203
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Lisa Anderson
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Online Store
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        July 15, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $34.50
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Shipped
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3202
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Samantha Green
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Shop
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        June 5, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $89.99
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Paid
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3201
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Adam Barlow
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Online Store
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        May 20, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $24.99
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Unfulfilled
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3207
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Sophia Anderson
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Shop
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        November 2, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $99.99
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Paid
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                        #3206
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        Daniel Smith
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Online Store
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        October 7, 2021
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                        $67.50
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                        Shipped
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
