import React from "react";
import { Button } from "@/components/ui/button";

type AsyncErrorBoundaryProps = {
  name?: string;
  children: React.ReactNode;
};

type AsyncErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

/**
 * Catches render-time errors from lazy imports (or any section crash)
 * so the app never ends up as a blank white screen.
 */
export default class AsyncErrorBoundary extends React.Component<
  AsyncErrorBoundaryProps,
  AsyncErrorBoundaryState
> {
  state: AsyncErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): AsyncErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("AsyncErrorBoundary caught error", {
      name: this.props.name,
      error,
      info,
    });
  }

  private handleReload = () => {
    try {
      sessionStorage.removeItem("__sbai_dyn_import_reloaded");
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="section-padding">
        <div className="section-container">
          <div className="rounded-2xl border bg-card p-6 md:p-10 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {this.props.name ? `${this.props.name} section` : "This section"} failed to load.
            </p>
            <h2 className="mt-2 text-xl md:text-2xl font-heading text-foreground">
              Please reload and try again
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              This can happen on slow networks when a lazily-loaded module can’t be fetched.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={this.handleReload}>Reload</Button>
              <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
                Retry
              </Button>
            </div>

            {this.state.message ? (
              <details className="mt-6 text-left max-w-3xl mx-auto">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Technical details
                </summary>
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs text-foreground overflow-auto">
                  {this.state.message}
                </pre>
              </details>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}
