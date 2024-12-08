import { ErrorBoundary } from "react-error-boundary";
import { Button, Col, Container, Row } from "react-bootstrap";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <Container className="pt-5">
      <Row className="justify-content-center">
        <Col sm={8} className="text-center">
          <h1 className="mb-4">Помилка</h1>
          <pre className="mb-4 text-danger">{error.message}</pre>
          <Button variant="primary" onClick={resetErrorBoundary}>
            Спробувати ще
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export const Catcher = (props: any) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
};
