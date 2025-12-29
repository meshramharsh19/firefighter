import { Button } from "@/components/ui/button";

export default function LogsPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </Button>

      <span className="mt-2 text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
