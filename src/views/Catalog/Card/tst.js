<BorderLayout
  key="catalog-BorderLayout"
  bodyClassName="ms2-border-layout-body catalog"
  header={
    <Form>
      <FormGroup controlId="labelService" key="labelService">
        <ControlLabel>
          <p></p>
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="service" key="service">
        <InputGroup>
          <Select clearable placeholder="test" />
        </InputGroup>
      </FormGroup>

      <FormGroup controlId="buttons" key="buttons"></FormGroup>
    </Form>
  }
  footer="test"
>
  {this.props.loading ? this.renderLoading() : this.renderResult()}
</BorderLayout>;
