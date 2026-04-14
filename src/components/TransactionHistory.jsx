import React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// Remove the ScrollArea import since it doesn't exist

export function TransactionHistory({ transactions, accounts, onClose }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Replace ScrollArea with a div that has overflow-auto */}
          <div className="h-[70vh] overflow-auto pr-2">
            <div className="space-y-4">
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center border-b pb-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {transaction.tipo || 'Transaction'} 
                          {transaction.estado && ` - ${transaction.estado}`}
                        </p>
                        <p className={`font-medium ${
                          accounts.some(a => a.id === transaction.cuentaDestinoId) && 
                          (!accounts.some(a => a.id === transaction.cuentaOrigenId) || 
                           transaction.cuentaDestinoId === transaction.cuentaOrigenId)
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {accounts.some(a => a.id === transaction.cuentaDestinoId) && 
                           !accounts.some(a => a.id === transaction.cuentaOrigenId)
                            ? '+' 
                            : accounts.some(a => a.id === transaction.cuentaOrigenId) &&
                              !accounts.some(a => a.id === transaction.cuentaDestinoId)
                              ? '-' 
                              : ''}
                          ${Math.abs(parseFloat(transaction.monto || 0)).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From: {accounts.find(a => a.id === transaction.cuentaOrigenId)?.numerocuenta || 'Unknown'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        To: {accounts.find(a => a.id === transaction.cuentaDestinoId)?.numerocuenta || 'Unknown'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.fecha).toLocaleDateString()} {new Date(transaction.fecha).toLocaleTimeString()}
                      </p>
                      {transaction.descripcion && (
                        <p className="text-xs italic mt-1">{transaction.descripcion}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No transactions found</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}